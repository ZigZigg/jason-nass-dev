import Image from 'next/image';
import React from 'react';

// Define file type for articles
type FileType = 'PDF' | 'JPG' | 'DOC';

// File information interface
interface FileInfo {
  name: string;
  size: string;
  path: string;
  type: FileType;
  color?: string;
}

// Article interface
interface Article {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  file: FileInfo;
}

// Resource Articles Data interface
interface ResourceArticlesData {
  title: string;
  subTitle?: string;
  articles: Article[];
}

interface Props {
  data: ResourceArticlesData;
}

// Document icon component
const DocumentIcon: React.FC<{ fileType: 'PDF' | 'JPG' | 'DOC' }> = ({ fileType }) => {
  return (
    <Image
      src={`/images/icons/${fileType.toLowerCase()}-file-type.svg`}
      alt={fileType}
      width={40}
      height={40}
    />
  );
};

// Download icon component
const DownloadIcon: React.FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0003 13.3327L10.0003 3.33268M10.0003 13.3327L6.66699 9.99935M10.0003 13.3327L13.3337 9.99935M3.33366 16.666H16.667"
        stroke="#344054"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// File download component
const FileDownload: React.FC<{ file: FileInfo }> = ({ file }) => {
  return (
    <a href={file.path} download className="inline-block w-full">
      <div className="flex items-center gap-2 p-[10px_14px] bg-white border border-[#EAECF0] rounded-tr-lg rounded-br-lg rounded-bl-lg justify-between">
        <div className="flex items-center gap-2 md:w-[80%]">
          <div className="relative w-8 h-8">
            <DocumentIcon fileType={file.type} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm md:text-[10px] xl:text-sm font-medium text-[#344054] whitespace-nowrap overflow-hidden text-ellipsis">
              {file.name}
            </span>
            <span className="text-sm text-[#475467]">{file.size}</span>
          </div>
        </div>

        <div className="ml-2 flex items-center justify-center">
          <DownloadIcon />
        </div>
      </div>
    </a>
  );
};

// Article component
const ArticleItem: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
        <Image
          src={article.imagePath}
          alt={article.title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-[24px] md:text-[18px] xl:text-[24px] font-bold text-[#11304E]">
          {article.title}
        </h4>

        <p className="text-base text-[#637381]">{article.description}</p>

        <FileDownload file={article.file} />
      </div>
    </div>
  );
};

const ResourceArticles: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col px-[16px] md:px-[0px] w-full md:w-[220px] xl:w-[320px] flex-shrink-0 gap-6">
      <h3 className="text-[32px] uppercase text-[#205A93] font-semibold">{data.title}</h3>
      {data.subTitle && <p className="text-base text-[#637381]">{data.subTitle}</p>}
      <div className="flex flex-col gap-10">
        {data.articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ResourceArticles;
