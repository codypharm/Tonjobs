export interface IJob {
  owner: string;
  org: string;
  repo: string;
}

export interface IIssue {
  number: number;
  html_url: string;
  title: string;
  state: number;
  repository_url: string;
  id: number;
}

export interface ITask {
  number: number;
  html_url: string;
  title: string;
  state: number;
  repository_url: string;
  id: number;
  reward: number;
  completedBy: string;
  isActive: boolean;
}
