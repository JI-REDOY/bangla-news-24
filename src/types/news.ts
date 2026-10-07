export type Article = {
    id: string;
    title: string;
    description: string | null;
    link: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    type: string;
    isLive: boolean;
    firstPublished: string | null;
    lastPublished: string | null;
    source: string;
};

export type Section = {
    title: string;
    curationId: string;
    curationType: string;
    link: string | null;
    count: number;
    articles: Article[];
};


export type CategoryResponse = {
    success: boolean;
    count: number;
    slug: string;
    topicId: string;
    title: string;
    page: number;
    pageCount: number;
    data: Article[];
};

// Article details page
export type BodyBlock =
    | { type: "text"; text: string }
    | { type: "subheading"; text: string }
    | {
          type: "image";
          url: string;
          width: number;
          height: number;
          caption: string;
          altText: string;
          copyrightHolder: string;
      };

export type Byline = {
    name: string;
    role?: string;
};

export type Topic = {
    id: string;
    name: string;
};

export type ArticleDetail = {
    id: string;
    title: string;
    description: unknown;       // জটিল nested — ignore
    link: string;
    firstPublished: string | null;
    lastPublished: string | null;
    byline: Byline[];
    topics: Topic[];
    tags: string[];
    imageUrl: string;
    body: BodyBlock[];
    text: string;
    wordCount: number;
    source: string;
    sourceUrl: string;
};

export type ArticleDetailResponse = {
    success: boolean;
    data: ArticleDetail;
};