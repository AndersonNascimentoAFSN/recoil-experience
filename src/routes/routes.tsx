import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../Layout";

const HomeComponent = lazy(() =>
  import("../pages/Home").then(({ Home }) => ({ default: Home }))
);

const RecoilAsyncComponent = lazy(() =>
  import("../pages/RecoilAsync").then(({ RecoilAsync }) => ({
    default: RecoilAsync,
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div>
                <span>Loading...</span>
              </div>
            }
          >
            <HomeComponent />
          </Suspense>
        ),
      },
      {
        path: "/recoilAsync",
        element: (
          <Suspense
            fallback={
              <div>
                <span>Loading...</span>
              </div>
            }
          >
            <RecoilAsyncComponent />
          </Suspense>
        ),
      },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
