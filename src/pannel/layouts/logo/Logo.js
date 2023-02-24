import LogoDark from "../../assets/images/logos/amplelogo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={'/'}>
        <Image src={LogoDark} alt="logo" />
    </Link>
  );
};

export default Logo;
