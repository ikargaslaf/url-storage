import { ApiPaginationMeta } from "@/resources/dto/types";

const getPaginationMeta = ({
  page,
  limit,
  total,
}: Omit<ApiPaginationMeta, 'pages'>): ApiPaginationMeta => {
  return {
    page,
    total,
    limit,
    pages: Math.ceil(total / limit),
  };
};

export default getPaginationMeta;
