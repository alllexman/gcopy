import { useState } from "react";
import useSession from "@/lib/use-session";
import { defaultUserInfo } from "@/lib/user";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Avator() {
  const locale = useLocale();
  const t = useTranslations("Avator");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const { session, logout, isLoading } = useSession();
  if (isLoading) {
    return null;
  }

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar placeholder"
      >
        <div className="w-8 rounded-full bg-neutral text-neutral-content">
          <span className="text-xs">
            {session.email.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a className="text-neutral-content btn-disabled">
            <span className="truncate">{session.email}</span>
          </a>
        </li>
        <li>
          <button
            disabled={clicked}
            onClick={() => {
              setClicked(true);
              logout(null, {
                optimisticData: defaultUserInfo,
              });
              router.push(`/${locale}/user/email-code`);
            }}
          >
            {t("logout")}
          </button>
        </li>
      </ul>
    </div>
  );
}
