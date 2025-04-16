import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    if (req.auth?.user) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return NextResponse.next()
})