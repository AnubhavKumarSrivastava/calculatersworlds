import type {NextConfig} from "next";
const nextConfig:NextConfig={
  poweredByHeader:false,
  compress:true,
  async headers(){return [{source:"/:path*",headers:[{key:"Cache-Control",value:"public, s-maxage=3600, stale-while-revalidate=86400"}]}]},
  async redirects(){return [
    {source:"/developer-tools",destination:"/dev",permanent:true},
    {source:"/developer/:slug",destination:"/dev/:slug",permanent:true},
    {source:"/file-tools",destination:"/files",permanent:true},
    {source:"/file-tools/:slug",destination:"/files/:slug",permanent:true},
    {source:"/developer-tools/:slug",destination:"/dev/:slug",permanent:true}
  ]}
};export default nextConfig;
