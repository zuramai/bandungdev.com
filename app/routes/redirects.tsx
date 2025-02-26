import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { configRedirects } from "~/configs/redirects";
import { formatPlural } from "~/utils/string";
import { Anchor } from "~/components/ui/anchor";

export const meta: MetaFunction = () => [{ title: "Redirects" }];

export const loader = ({ request }: LoaderFunctionArgs) => {
  const redirects = configRedirects;

  return json({ redirects });
};

export default function Route() {
  const { redirects } = useLoaderData<typeof loader>();
  return (
    <div className="px-2 sm:px-4">
      <div className="prose-config">
        <header>
          <h1>Redirects</h1>
          <p>
            {formatPlural("path", redirects.length)} redirect paths to URLs and
            other pages.
          </p>
        </header>
        <ul>
          {redirects.map(redirectItem => {
            return (
              <li key={redirectItem.path}>
                <Link to={redirectItem.path}>
                  <code>{redirectItem.path}</code>
                </Link>
                <span className="text-muted-foreground"> &rarr; </span>
                {redirectItem.url && (
                  <Anchor href={redirectItem.url}>
                    <code>{redirectItem.url}</code>
                  </Anchor>
                )}
                {redirectItem.to && (
                  <Link to={redirectItem.to}>
                    <code>{redirectItem.to}</code>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
