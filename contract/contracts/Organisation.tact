import "@stdlib/deploy";
/* 
what we need? 
1. organisation deploys this contract
2. org can have multiple repos, must be able to add repos
3. jobs can be added to repos, jobs must have activation option, reward, completed bool, 
4. contract can have balance
*/

struct Jobs {
    repoId: Int as int64;
    issueId: Int as int64;
    isActive: Bool = false;
    reward: Int as coins;
    isCompleted: Bool = false;
    completedBy: Address?;
}
struct Repos {
    repoUrl: String;
}
message AddRepo {
    repoUrl: String;
}
message AddJob {
    job: Jobs;
}
message JobCompleted {
    jobID: Int as int64;
    prUrl: String;
    contributorAdd: Address;
}
message ActivateJob {
    jobID: Int as int64;
}

contract Organisation with Deployable {
    owner: Address;
    operator: Address = address("EQDBRguDQHkckwk_3zy7AhqoIBa7s5KaLUAxdtxKFhI2sUHf"); // org address that handles job completion and job additions
    repos: map<Int, Repos>;
    jobs: map<Int, Jobs>;
    repoCount: Int = 0; // nuumber of repo added starts with key = 1
    jobCount: Int = 0; // nuumber of jobs added starts with key = 1
    totalCommitedValue: Int as coins = ton("0");
    const MinTonForStorage: Int = ton("0.5"); // minimum reuired balance of token

    init(){
        self.owner = sender();
    }

     fun getUsableBalance(): Int {
        return ((myBalance() - self.totalCommitedValue) - self.MinTonForStorage);
    }

    // for org

    receive(msg: AddRepo){
        require(sender() == self.owner, "Repo can only be added by owner");
        self.repoCount += 1;
        self.repos.set(self.repoCount, Repos{repoUrl: msg.repoUrl});
    }

    receive(msg: AddJob){
        require(sender() == self.operator, "Jobs can only be added by org");
        require(msg.job.repoId <= self.repoCount, "Repo ID invalid");
        // increment total jobs
        self.jobCount += 1;
        self.jobs.set(self.jobCount, msg.job);
    }

    receive(msg: ActivateJob){
        require(sender() == self.owner, "Repo can only be called by owner");
        let job: Jobs = self.jobs.get(msg.jobID)!!;
        require(job.isActive == false, "Job already active");
        require(self.getUsableBalance() >= job.reward, "Insufficient Balance");
        self.totalCommitedValue += job.reward;
        self.jobs.set(msg.jobID,
            Jobs{repoId: job.repoId, issueId: job.issueId, isActive: true, reward: job.reward, completedBy: null}
        );
    }

    // for contributor
    receive(msg: JobCompleted){
        require(sender() == self.operator, "Jobs can only be added by org");
        require(msg.jobID <= self.jobCount, "Job ID invalid");
        let job: Jobs = self.jobs.get(msg.jobID)!!;
        require(job.isActive == true, "Job not active");
        self.jobs.set(msg.jobID,
            Jobs{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: job.reward, completedBy: sender()}
        );
        send(SendParameters{
                to: sender(),
                bounce: true,
                value: job.reward,
                mode: (SendRemainingValue + SendIgnoreErrors)
            }
        );
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }

    get fun getJobs(): map<Int, Jobs> {
        return self.jobs;
    }

    get fun getRepos(): map<Int, Repos> {
        return self.repos;
    }

    get fun withdrawableAmount(): Int {
        return self.getUsableBalance();
    }
}