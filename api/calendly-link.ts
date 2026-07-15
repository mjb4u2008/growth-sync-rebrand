import { DEFAULT_CALENDLY_URL } from '../src/utils/calendly';

type JsonResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
};

export default function handler(_request: unknown, response: JsonResponse) {
  const calendlyUrl = DEFAULT_CALENDLY_URL;

  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');

  if (!calendlyUrl) {
    response.status(404).json({
      url: null,
    });
    return;
  }

  response.status(200).json({
    url: calendlyUrl,
  });
}
