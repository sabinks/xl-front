import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { checkSubset } from "./utils";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    let islogin = request.cookies.get("token");
    const role = request.cookies.get("role");

    const routes = [
        { roles: ['superadmin'], startPath: /\/auth\/dashboard/ },
        { roles: ['superadmin'], startPath: /\/auth\/appointment-date/ },
        { roles: ['superadmin'], startPath: /\/auth\/clients/ },
        { roles: ['superadmin'], startPath: /\/auth\/newsletter/ },
        { roles: ['superadmin'], startPath: /\/auth\/send-newsletter/ },
        { roles: ['superadmin'], startPath: /\/auth\/clients\/\d+\/profile/ },
    ]
    if (!islogin) {
        if (request.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.redirect(redirectUrl);
        }
    }
    const authorized: any = routes && role?.value && routes.map(({ roles, startPath }: any) => {
        if (url.pathname.match(startPath)) {
            if (checkSubset(roles, role.value)) {
                return false
            }
            return true
        }
    })
    if (authorized?.includes(false)) {
        return NextResponse.redirect(redirectUrl);
    }
}
