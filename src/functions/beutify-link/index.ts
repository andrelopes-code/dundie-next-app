"use client";

export default function BeutifyLink(link: string) {
    link = link.replace("https://", "");
    link = link.replace("www.", "");
    link = link.replace("(.*)/", "/1");
    link = decodeURIComponent(link);
    link = link[link.length - 1] === "/" ? link.slice(0, -1) : link;
    return link;
}
