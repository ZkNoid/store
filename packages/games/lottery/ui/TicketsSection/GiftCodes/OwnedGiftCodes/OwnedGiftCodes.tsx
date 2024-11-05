import { cn } from "@zknoid/sdk/lib/helpers";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useContext, useEffect, useState } from "react";
import LotteryContext, { IGiftCodeCheckResult } from "../../../../lib/contexts/LotteryContext";
import { GiftCode, useGiftCodes } from "../../../../stores/giftCodes";

export default function OwnedGiftCodes({
  userGiftCodes,
}: {
  userGiftCodes: GiftCode[];
}) {
  const notificationStore = useNotificationStore();
  const codesStore = useGiftCodes();
  const lotteryContext = useContext(LotteryContext);

  const copyCodes = (giftCode: string | string[]) => {
    const codes = giftCode.toString().replaceAll(",", ", ");
    navigator.clipboard.writeText(codes);
    notificationStore.create({
      type: "success",
      message: "Copied!",
    });
  };

  useEffect(() => {
      lotteryContext.checkGiftCodesQuery(
        codesStore.giftCodes.map((x) => x.code)
      ).then(giftCodes => {
        if (giftCodes)
          codesStore.updateGiftCodes(giftCodes);
      });
  }, [codesStore.giftCodes]);

  return (
    <div className={"flex h-full flex-col gap-[0.521vw] p-[0.521vw]"}>
      <span className={"w-full font-plexsans text-[0.729vw] text-foreground"}>
        The codes you already bought previously
      </span>
      <div className={"flex flex-col"}>
        <div className={"grid grid-cols-5 pt-[0.521vw]"}>
          <span
            className={"my-auto font-plexsans text-[0.729vw] text-foreground"}
          >
            #
          </span>
          <span
            className={
              "col-span-2 my-auto font-plexsans text-[0.729vw] text-foreground"
            }
          >
            Code
          </span>
          <span
            className={"my-auto font-plexsans text-[0.729vw] text-foreground"}
          >
            Status
          </span>
        </div>
      </div>
      <div
        className={"flex max-h-[12vw] flex-col overflow-y-scroll pr-[0.5vw]"}
      >
        {userGiftCodes.map((item, index) => (
          <div
            key={index}
            className={
              "grid grid-cols-5 border-b border-foreground py-[0.521vw] first:border-t"
            }
          >
            <span
              className={"my-auto font-plexsans text-[0.729vw] text-foreground"}
            >
              {index + 1}
            </span>
            <span
              className={
                "col-span-2 my-auto font-plexsans text-[0.729vw] text-foreground"
              }
            >
              {item.code}
            </span>
            <span
              className={cn(
                "my-auto font-plexsans text-[0.729vw] text-foreground",
                {
                  "text-[#FF5B23]": item.used,
                }
              )}
            >
              {!item.approved ? "Payment confirmation" : item.used ? 'Used': 'Active'}
            </span>
            {!item.used && (
              <button
                className={
                  "cursor-pointer rounded-[0.26vw] bg-right-accent text-center text-bg-dark hover:opacity-80"
                }
                onClick={() => copyCodes(item.code)}
              >
                Copy
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={"mt-auto flex w-full flex-row gap-[0.521vw]"}>
        <button
          className={
            "w-full cursor-pointer rounded-[0.26vw] bg-middle-accent py-[0.26vw] font-museo text-[0.625vw] font-medium text-foreground hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60"
          }
          disabled={!userGiftCodes.find((item) => item.used)}
          onClick={() => {
            codesStore.removeGiftCodes([]);
          }}
        >
          Delete all used codes
        </button>
        <button
          className={
            "w-full cursor-pointer rounded-[0.26vw] bg-right-accent py-[0.26vw] font-museo text-[0.625vw] font-medium text-bg-dark hover:opacity-80"
          }
          onClick={() => copyCodes(userGiftCodes.map((item) => item.code))}
        >
          Copy all
        </button>
      </div>
    </div>
  );
}
