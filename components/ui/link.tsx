import Link from "next/link";
export default function LinkNormal({
    href,
    name,
    className = "link",
    targrt = "_self",
}) {
    return (
        <Link href={href} className={className} target={targrt}>
            {name}
        </Link>
    );
}
