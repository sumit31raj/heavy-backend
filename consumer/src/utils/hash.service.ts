import BigNumber from "bignumber.js";
import { of } from "await-of";
import { ethers, utils } from "ethers";
import { getConnection } from "typeorm";
import { Hash, ResultStatusEnum } from "../database/entity/hash.entity";

function generateHash(input) {
  const hash = input.toString(16);
  if (hash.length % 2 === 0) {
    const ether = ethers.utils.keccak256(utils.arrayify("0x" + hash));
    return ether;
  }
  const ether = ethers.utils.keccak256(utils.arrayify("0x0" + hash));
  return ether;
}

async function getDetails(record) {
  try {
    const { input_hex, nonce_range } = record;
    if (input_hex === null || input_hex === "") {
      return { error: "Hex is empty" };
    }
    const initialHash = new BigNumber(input_hex, 16);
    const { start_nonce, end_nonce } = nonce_range;
    let nonce = new BigNumber(start_nonce);
    for (let i = Number(start_nonce); i < Number(end_nonce); i++) {
      const input = BigNumber.sum(new BigNumber(input_hex, 16), nonce);
      const hash = generateHash(input);
      const newHash = new BigNumber(hash, 16);
      if (initialHash.isGreaterThan(newHash)) {
        return { nonce: nonce.toString(), outputHex: hash };
      }
      nonce = BigNumber.sum(nonce, 1);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function findingNonce(job) {
  let hashRepository = getConnection().getRepository(Hash);
  if (job?.data && job.data.status === ResultStatusEnum.PENDING) {
    const [processRecord, processError] = await of(
      hashRepository.findOne({
        where: {
          id: job.data.id,
        },
      })
    );
    if (processError) throw processError;
    if (!processRecord) return {};
    if (processRecord) {
      const processJob = { ...processRecord, ...job?.data };
      const response: any = await getDetails(processJob);
      if (Object.keys(response).length && response.nonce) {
        const [updateDB, updateError] = await of(
          hashRepository.update(
            {
              id: processRecord?.id,
            },
            {
              nonce: response?.nonce,
              status: ResultStatusEnum.COMPLETED,
              output_hex: response?.outputHex,
            }
          )
        );
        if (updateError) throw updateError;
        if (!updateDB) return {};
        if (updateDB) {
          return {
            success: true,
            status: ResultStatusEnum.COMPLETED,
            data: response,
          };
        }
      }
    }
  }
}
