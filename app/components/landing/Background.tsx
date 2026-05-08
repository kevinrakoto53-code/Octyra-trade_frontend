import Image from "next/image";

export default function Background() {
  return (
    <>
      <div className="w-[90%] h-[90] glow-circle z-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="glow-bar" />
        ))}
        <Image
          src="/Octyra-premiums.png"
          alt="OCTYRA LOGO"
          fill
          sizes="90vw"
          priority
          className="object-cover rounded-full"
        />{" "}
      </div>
      <div className="glow-ring" />
    </>
  );
}
