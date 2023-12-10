import CryptoJS from "crypto-js";
import { redirect } from 'next/navigation';
import getDataset, { ReviewQuery } from "./utils/loader";

const BACKEND_URL = 'http://easyreview-backend:8000/api/dataset/fetch/'

interface queryParams {
  siteUrl: string,
  apiToken: string | null,
  datasetPid: string,
  token?: string
}

export default async function Home(
  {
    params,
    searchParams,
  }: {
    params: { slug: string };
    searchParams: queryParams;
  }
) {

  // Functions
  const decryptData = (token: string) => {
    const cleanedToken = token.toString().replace(/xMl3Jk/g, '+').replace('Por21Ld', '/').replace('Ml32', '=');
    const bytes = CryptoJS.AES.decrypt(cleanedToken, "XkhZG4fW2t2W");
    return bytes.toString(CryptoJS.enc.Utf8)
  };

  if (searchParams.token) {
    const reviewId = decryptData(searchParams.token)
    redirect(`/review/${reviewId}`)
  }

  const query: ReviewQuery = await getDataset(
    {
      site_url: searchParams.siteUrl,
      doi: searchParams.datasetPid,
      api_token: searchParams.apiToken,
      BACKEND_URL: BACKEND_URL
    }
  )

  if (query.review_id) {
    redirect(`/review/${query.review_id}`)
  }


  return (<h1>Could not fetch dataset</h1>)
}
