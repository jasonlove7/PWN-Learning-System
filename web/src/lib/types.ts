export type Module = {
  id: string;
  title: string;
};

export type Article = {
  slug: string;
  module: string;
  order: number;
  title: string;
  description: string;
  difficulty: number;
  prerequisites: string[];
  objectives: string[];
  lab: string;
  file: string;
  body: string;
};

export type Catalog = {
  generatedFrom: string;
  modules: Module[];
  articles: Article[];
};
