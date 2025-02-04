import { ImageResponse } from "next/og";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";

export const alt = PROJECT_TITLE;
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-purple-600">
        <div tw="flex flex-col text-center text-white">
          <h1 tw="text-7xl font-bold mb-4">{PROJECT_TITLE}</h1>
          <p tw="text-3xl font-medium text-purple-100">{PROJECT_DESCRIPTION}</p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
