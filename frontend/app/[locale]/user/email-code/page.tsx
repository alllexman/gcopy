"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function EmailCode({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const locale = useLocale();
  const t = useTranslations("EmailCode");
  const [errorMessage, setErrorMessage] = useState("");
  const email = searchParams.email;
  const router = useRouter();

  const createEmailCode = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;

    fetch("/api/user/email-code", {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email }),
    }).then(async (res: Response) => {
      if (res.status != 200) {
        const body = await res.json();
        setErrorMessage(body.message);
      }
      if (res.status == 200) {
        router.push(`/${locale}/user/login?email=${email}`);
      }
    });
  };

  return (
    <form
      onSubmit={createEmailCode}
      className="card w-full md:w-[32rem] bg-base-100 shadow-xl"
    >
      <div className="card-body gap-4">
        <Image src="/gcopy.svg" width={50} height={50} alt="gcopy's logo" />
        <div className="flex flex-col gap-0">
          <h2 className="card-title">{t("title")}</h2>
          <span className="text-xs">{t("smallTitle")}</span>
        </div>
        <p>{t("subTitle")}</p>
        <div>
          <input
            name="email"
            type="text"
            placeholder={t("placeholder")}
            className="input input-bordered w-full"
            defaultValue={email}
            autoFocus
          />
          <span className="text-xs">{t("tip")}</span>
        </div>
        {errorMessage && <p className="text-error">{errorMessage}</p>}
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary">
            {t("buttonText")}
          </button>
        </div>
      </div>
    </form>
  );
}