export interface FileInfo {
  name: string;
  size: string;
  path: string;
  type: 'PDF' | 'JPG' | 'DOC';
  color?: string;
}

export interface Video {
  id: number;
  url: string;
  thumbnail: string;
  title: string;
  quote?: string;
  description?: string;
  bulletPoints?: string[];
  showDetail?: boolean;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  file: FileInfo;
}

export interface StrategicPlanningData {
  introductionVideo: {
    title: string;
    videos: Video[];
    keyTopicVideo: {
      title: string;
      video: Video;
    };
    monograph: {
      title: string;
      description: string;
      bulletPoints: string[];
      downloadFile: FileInfo;
    };
    sponsorsSlice: number;
  };
  resourceArticles: {
    title: string;
    articles: Article[];
  };
} 