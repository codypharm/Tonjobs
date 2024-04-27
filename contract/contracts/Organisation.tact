import "@stdlib/deploy";
/* 
what we need? 
1. organisation deploys this contract
2. org can have multiple repos, must be able to add repos
3. jobs can be added to repos, jobs must have activation option, reward, completed bool, 
4. contract can have balance
*/

struct Job {
    repoId: Int as int64;
    issueId: Int as int64;
    isActive: Bool = false;
    reward: Int as coins;
    isCompleted: Bool = false;
    completedBy: Address?;
    owner: Address?;
    employer:Address;
}



message JobCompleted {
    issueId: Int as int64;
}

message JobCancelled {
    issueId: Int as int64;
}
message ActivateJob {
    repoId: Int as int64;
    issueId: Int as int64;
    isActive: Bool = false;
    reward: Int as coins;
    isCompleted: Bool = false;
    completedBy: Address?;
    owner: Address?;
    empoloyer:Address;
}

message VerifyJobCancellation {
    issueId: Int as int64;
}

message VerifyJobClaim{
    issueId: Int as int64;
    completedBy: Address;
}


message ChangeOperator{
    operator: Address;
}




contract Organisation with Deployable {
    owner: Address;
    operator: Address ; // address of verifier
    jobs: map<Int, Job>;
    repoCount: Int = 0; // nuumber of repo added starts with key = 1
    jobCount: Int = 0; // nuumber of jobs added starts with key = 1
    charge: Int as coins = ton("0.5");
    accountBalance: Int as coins = ton("0");
   

    init(){
        self.owner = sender();
        self.operator = sender();
    }

    


    // Admin tasks
    receive (msg : ChangeOperator) {
        require (sender() == self.owner, "Invalid command");
        self.operator = msg.operator;
    }

    receive ("withdraw") {
        require(sender() == self.owner, "Invalid command");
         send(SendParameters{
                to: sender(),
                bounce: true,
                value: self.accountBalance,
                mode: SendIgnoreErrors
            }
        );
    }

    //Job Tasks
    receive(msg: ActivateJob){
        let limit :Int  = ton("0.05") + self.charge;
        let ctx : Context = context();
        let reward : Int  = ctx.value - limit;
        self.accountBalance += self.charge;

        require(ctx.value > limit, "Value sent is less than limit");
        require (reward > 0, "Reward is too low");

        self.jobs.set(msg.issueId,
            Job{repoId: msg.repoId, issueId: msg.issueId, isActive: true, reward: reward, completedBy: null,owner: null, employer: sender()}
        );
    }

    receive (msg: VerifyJobCancellation){
        let job : Job = self.jobs.get(msg.issueId)!!;
        require(sender() == job.employer, "Invalid command");
         self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: job.reward, completedBy: job.completedBy,owner: sender(), employer: job.employer}
        );
    }

    receive(msg: JobCancelled){
    
        let job: Job = self.jobs.get(msg.issueId)!!;
        require(job.isActive == false, "Job still active");
        require(job.reward > 0, "Job already claimed");
        require(job.employer == sender(), "Invlid job cancellation");
        self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: ton("0"), completedBy: job.completedBy,owner: sender(), employer: job.employer}
        );
        send(SendParameters{
                to: sender(),
                bounce: true,
                value: job.reward,
                mode: SendIgnoreErrors
            }
        );
    }


    // for contributor
  receive (msg: VerifyJobClaim){
        let job : Job = self.jobs.get(msg.issueId)!!;
        require(job.isActive == true, "Job not active");
         self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: job.reward, completedBy:msg.completedBy ,owner: msg.completedBy,employer: job.employer}
        );
    }

    receive(msg: JobCompleted){
    
        let job: Job = self.jobs.get(msg.issueId)!!;
        require(job.isActive == false, "Job still active");
        require(job.reward > 0, "Job already claimed");
        require(job.owner == sender(), "Invlid job claim");
        self.jobs.set(msg.issueId,
             Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: ton("0"), completedBy: job.completedBy,owner: sender(), employer: job.employer, isCompleted: true}
        );
        send(SendParameters{
                to: sender(),
                bounce: true,
                value: job.reward,
                mode: SendIgnoreErrors
            }
        );
    }

    get fun balance(): String {
        return self.accountBalance.toCoinsString();
    }

    get fun job(id: Int) : Job{
        return self.jobs.get(id)!!;
    }

    // get fun getJobs(): map<Int, Jobs> {
    //     return self.jobs;
    // }

    // get fun getRepos(): map<Int, Repos> {
    //     return self.repos;
    // }

    // get fun withdrawableAmount(): Int {
    //     return self.getUsableBalance();
    // }
}