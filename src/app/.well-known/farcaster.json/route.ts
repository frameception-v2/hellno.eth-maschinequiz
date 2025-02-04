import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      message: {
        domain: "hellnoeth-maschinequiz.vercel.app",
        timestamp: 1738707303,
        expirationTime: 1746483303
      },
      signature: "2dd03d8555cf7d00a091a72587c5e82077b113b9bdade231fa964e7e2f68c7360a30ad2462e20467e4bd5781236d944aa8c984c364a6c2ae86c5a08b28a400211c",
      signingKey: "bf7782f6cdae4e9b19e914c752581f4eb0bff13594f0b33cdd2267a72ca837d9"
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
