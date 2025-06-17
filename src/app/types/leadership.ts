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
  videos?: Video[];
  file: FileInfo;
}

export interface StrategicPlanningData {
  heading?: string;
  introductionVideo: {
    title: string;
    videos: Video[];
    keyTopicVideo: {
      title: string;
      videos: Video[];
    };
    monograph: {
      title: string;
      description: string;
      bulletPoints: string[];
      downloadFile: FileInfo;
      isShowDetail?: boolean;
    };
    sponsorsSlice: number;
  };
  resourceArticles: {
    title: string;
    subTitle?: string;
    articles: Article[];
  };
} 