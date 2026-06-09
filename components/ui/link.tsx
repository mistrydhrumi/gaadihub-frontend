import Link from "next/link";

type LinkNormalProps = {
    href: string;
    name: string;
    className?: string;
    target?: string;
};

export default function LinkNormal({
    href,
    name,
    className = "link",
    target = "_self",
}: LinkNormalProps) {
    return (
        <Link href={href} className={className} target={target}>
            {name}
        </Link>
    );
}
