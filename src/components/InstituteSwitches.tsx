import Link from "next/link";
import { useMemo, type FC } from "react";

import { getInstituteConfig, getPrevInstitute } from "@/lib/institutes";
import { Institutes } from "@/models/institutes";

type InstituteSwitchesProps = {
  institute: Institutes;
  links?: {
    name: string;
    url: string;
  }[];
};

type InstituteSwitchProps = {
  name: string;
  url: string;
  right?: boolean;
};

const InstituteSwitch: FC<InstituteSwitchProps> = ({ url, name, right }) => {
  return (
    <div
      className={`bottom-10 my-3 justify-self-center ${
        right ? "lg:justify-self-end" : "lg:justify-self-start"
      }`}
    >
      <Link
        href={url || "/"}
        className="pointer-events-auto block rounded-md bg-black px-3 py-2 text-white transition-transform hover:scale-105 hover:border-b-0"
      >
        {!right ? "<" : ""} Zur {name} Website {right ? ">" : ""}
      </Link>
    </div>
  );
};

export { InstituteSwitch };

const InstituteSwitches: FC<InstituteSwitchesProps> = ({ links, institute }) => {

  const processedLinks = useMemo(() => {
    if(links) {
      return links
    }

    if (!institute || institute >= Institutes.__LENGTH) {
      institute = Institutes.HTWR
    }

    const next = getPrevInstitute(institute);
    const prev = getPrevInstitute(next);
    links = [
      { name: getInstituteConfig(prev).name, url: getInstituteConfig(prev).href },
      { name: getInstituteConfig(next).name, url: getInstituteConfig(next).href },
    ]

    return links
  }, [institute, links])

  return (
    <div className="pointer-events-none left-0 grid w-full grid-cols-1 grid-rows-2 lg:fixed lg:bottom-10 lg:grid-cols-2 lg:grid-rows-1 lg:px-4">
      {processedLinks && processedLinks[0] && processedLinks[0].url ? (
        <InstituteSwitch {...processedLinks[0]} right={false} />
      ) : (
        <></>
      )}
      {processedLinks && processedLinks[1] && processedLinks[1].url ? (
        <InstituteSwitch {...processedLinks[1]} right={true} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default InstituteSwitches;
