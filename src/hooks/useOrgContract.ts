import { Organisation } from "../../contract/wrappers/Organisation";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { useTonClient } from "@/hooks/useTonClient";
import { Address, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

interface IJob {
  repoId: number;
  issueId: number;
  isActive: boolean;
  reward: number;
  isCompleted: boolean;
  comletedBy: Address;
}

interface IJobCompleted {
  jobID: number;
  prUrl: number;
  contributorAdd: Address;
}

export function useOrganisationContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();

  const orgContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = Organisation.fromAddress(
      Address.parse("EQC97rXtWtr482VBDS75c48B7EaFAh3cts-J3o3n7K_0gSCu") // replaCE  with actuall address
    );

    //@ts-ignore
    return client.open(contract) as OpenedContract<Organisation>;
  }, [client]);

  const addRepo = async (url: string) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "AddRepo",
        repoUrl: url,
      }
    );
  };

  const addJob = async (job: IJob) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "AddJob",
        ...job,
      }
    );
  };

  const activateJob = async (jobId: number, amount: number) => {
    amount += 0.05;
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano(amount),
      },
      {
        $$type: "ActivateJob",
        jobID: jobId,
      }
    );
  };

  const completedJob = async (job: IJobCompleted) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "JobCompleted",
        ...job,
      }
    );
  };

  const getBalance = async () => {
    //@ts-ignore
    return await orgContract?.getBalance();
  };

  const getJobs = async () => {
    //@ts-ignore
    return await orgContract?.getGetJobs();
  };

  const getRepos = async () => {
    //@ts-ignore
    return await orgContract?.getGetRepos();
  };

  const getAvailableAmount = async () => {
    //@ts-ignore
    return await orgContract?.getWithdrawableAmount();
  };

  return {
    addRepo,
    addJob,
    activateJob,
    completedJob,
    getBalance,
    getAvailableAmount,
    getJobs,
    getRepos,
  };
}
