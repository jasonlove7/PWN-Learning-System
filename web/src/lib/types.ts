export type Knowledge = {
  id: string;
  title: string;
  description: string;
  importance: number;
  difficulty: number;
  track: string;
  type: string;
  depth: string;
  prerequisites: string[];
  objectives: string[];
  resources: string[];
  challenges: string[];
  writeups: string[];
  practiceStatus: string;
  verificationStatus: string;
  file: string;
};

export type Hint = { title: string; body: string };

export type Challenge = {
  id: string;
  name: string;
  platform: string;
  event: string;
  year: string;
  category: string;
  difficulty: string;
  url: string;
  knowledgePoints: string[];
  prerequisites: string[];
  whySelected: string;
  verificationStatus: string;
  writeups: string[];
  file: string;
  hints: Hint[];
};

export type Writeup = {
  id: string;
  type: string;
  title: string;
  challenge: string;
  author: string;
  url: string;
  summary: string;
  verified: boolean;
  correspondence: string;
  file: string;
};

export type Resource = {
  id: string;
  title: string;
  author: string;
  url: string;
  sourceType: string;
  language: string;
  tier: string;
  verified: boolean;
  summary: string;
  relatedKnowledge: string[];
  file: string;
};

export type Specialization = { slug: string; title: string; note: string };

export type Catalog = {
  generatedFrom: string;
  knowledge: Knowledge[];
  challenges: Challenge[];
  writeups: Writeup[];
  resources: Resource[];
  specializations: Specialization[];
};
