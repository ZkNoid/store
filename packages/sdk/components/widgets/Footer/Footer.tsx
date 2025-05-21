import Link from "next/link";
import Image from "next/image";
import zknoidLogo from "../../../public/image/zknoid-logo.svg";
import { SOCIALS, SOCIALS_LINKS } from "../../../constants/socials";

export default function Footer() {
  return (
    <div className="mx-[4.651vw] lg:!mx-[2.604vw] mb-[4.651vw] lg:!mb-[2.604vw] mt-[23.256vw] lg:!mt-[5.208vw] flex flex-col gap-[4.651vw] lg:!gap-[1.979vw]">
      <div className={"flex flex-col lg:!grid grid-cols-10 w-full"}>
        <div className={"w-full col-span-2 lg:!flex flex-col justify-between"}>
          <Link
            href={"/"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={"hover:opacity-80"}
          >
            <Image
              src={zknoidLogo}
              alt={"Zknoid logo"}
              className={"h-full w-[34.884vw] lg:!w-[11.458vw]"}
            />
          </Link>
          <div
            className={
              "hidden lg:!block lg:!mt-0 font-mono text-[3.256vw] lg:!text-[0.625vw] font-light"
            }
          >
            © {new Date().getFullYear()} ZkNoid: all rights reserved
          </div>
        </div>
        <div
          className={
            "col-start-6 col-span-4 hidden lg:!flex flex-row justify-between"
          }
        >
          <div className={"flex flex-col gap-[0.781vw]"}>
            <Link
              href={"/#games"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              Games
            </Link>
            <Link
              href={"/nft/collections"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              NFT Marketplace
            </Link>
            <Link
              href={"/#events"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              Events
            </Link>
          </div>
          <div className={"flex flex-col gap-[0.781vw]"}>
            <Link
              href={"/?widget=faq#faq"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              About us
            </Link>
            <Link
              href={"https://docs.zknoid.io/"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              Docs
            </Link>
            <Link
              href={SOCIALS_LINKS.medium}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              Blog
            </Link>
            <Link
              href={"/?widget=faq#faq"}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80"
              }
            >
              FAQ & Support
            </Link>
          </div>
          <div className={"flex flex-col gap-[0.781vw]"}>
            <Link
              href={SOCIALS_LINKS.github}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80 flex flex-row gap-[0.521vw] uppercase"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1.25vw] h-[1.25vw]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.9785 7.34837e-05C9.13433 0.000466552 6.38306 1.03998 4.21686 2.93266C2.05065 4.82534 0.610823 7.44771 0.15493 10.3307C-0.300964 13.2137 0.25682 16.1692 1.7285 18.6685C3.20018 21.1678 5.48976 23.048 8.18766 23.9726C8.78666 24.0868 9.04338 23.7089 9.04338 23.3838V21.2924C5.71463 22.0305 5.01294 19.6403 5.01294 19.6403C4.77885 18.8871 4.28619 18.2468 3.62667 17.8388C2.5399 17.0831 3.71224 17.0919 3.71224 17.0919C4.09184 17.147 4.45417 17.2904 4.77155 17.5112C5.08892 17.7321 5.35296 18.0245 5.54348 18.3661C5.87494 18.9766 6.42893 19.4269 7.08364 19.6181C7.73834 19.8092 8.44018 19.7256 9.03482 19.3855C9.08314 18.762 9.35081 18.1778 9.78786 17.7422C7.13512 17.4258 4.33692 16.3713 4.33692 11.6612C4.31752 10.4379 4.75898 9.25412 5.56915 8.35706C5.20245 7.29745 5.24532 6.13378 5.68895 5.10565C5.68895 5.10565 6.69015 4.77173 8.98348 6.36228C10.9443 5.81301 13.0127 5.81301 14.9735 6.36228C17.2583 4.77173 18.2595 5.10565 18.2595 5.10565C18.7031 6.13378 18.746 7.29745 18.3793 8.35706C19.1895 9.25412 19.6309 10.4379 19.6115 11.6612C19.6115 16.3889 16.8133 17.4258 14.1435 17.7334C14.4295 18.0311 14.65 18.3883 14.7902 18.7809C14.9305 19.1735 14.9871 19.5924 14.9564 20.0094V23.3838C14.9564 23.788 15.1703 24.0956 15.8121 23.9726C18.5136 23.0468 20.8055 21.1631 22.277 18.6591C23.7484 16.1552 24.3031 13.1948 23.8416 10.3089C23.3801 7.42304 21.9326 4.80035 19.7586 2.91119C17.5846 1.02203 14.8264 -0.01003 11.9785 7.34837e-05Z"
                  fill="#F9F8F4"
                />
              </svg>
              <span>Github</span>
            </Link>
            <Link
              href={SOCIALS_LINKS.twitter}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80 flex flex-row gap-[0.521vw] uppercase"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1.25vw] h-[1.25vw]"
              >
                <rect width="24" height="24" rx="12" fill="#F9F8F4" />
                <mask
                  id="mask0_9488_36722"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="5"
                  y="5"
                  width="14"
                  height="14"
                >
                  <path d="M5 5H19V19H5V5Z" fill="white" />
                </mask>
                <g mask="url(#mask0_9488_36722)">
                  <path
                    d="M16.025 5.65625H18.172L13.482 11.0303L19 18.3442H14.68L11.294 13.9093L7.424 18.3442H5.275L10.291 12.5942L5 5.65725H9.43L12.486 9.71025L16.025 5.65625ZM15.27 17.0562H16.46L8.78 6.87725H7.504L15.27 17.0562Z"
                    fill="black"
                  />
                </g>
              </svg>
              <span>Twitter</span>
            </Link>
            <Link
              href={SOCIALS_LINKS.telegram}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80 flex flex-row gap-[0.521vw] uppercase"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1.25vw] h-[1.25vw]"
              >
                <path
                  d="M12 0C5.37058 0 0 5.37135 0 12C0 18.6286 5.37135 24 12 24C18.6294 24 24 18.6286 24 12C24 5.37135 18.6286 0 12 0ZM17.8939 8.22116L15.9244 17.5022C15.7788 18.1603 15.3871 18.3197 14.8405 18.0101L11.8405 15.799L10.3935 17.1925C10.2341 17.352 10.0986 17.4875 9.7889 17.4875L10.0018 14.4341L15.5613 9.4111C15.8036 9.19819 15.5079 9.07742 15.1881 9.29032L8.31716 13.6157L5.35587 12.6914C4.71252 12.4885 4.69781 12.048 5.49135 11.7383L17.0609 7.27665C17.5982 7.0831 18.0674 7.40748 17.8932 8.22039L17.8939 8.22116Z"
                  fill="#F9F8F4"
                />
              </svg>
              <span>Telegram</span>
            </Link>
            <Link
              href={SOCIALS_LINKS.discord}
              className={
                "text-[0.833vw] font-medium font-museo hover:opacity-80 flex flex-row gap-[0.521vw] uppercase"
              }
            >
              <svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1.25vw] h-[1.25vw]"
              >
                <path
                  d="M20.307 1.52009C18.787 0.811503 17.1412 0.297204 15.4269 5.25708e-05C15.4119 -0.000428132 15.3969 0.00239261 15.3831 0.00831652C15.3693 0.0142404 15.3569 0.0231236 15.3469 0.0343395C15.1412 0.411493 14.9012 0.902934 14.7412 1.28009C12.9228 1.00579 11.0736 1.00579 9.2553 1.28009C9.09529 0.891505 8.85529 0.411493 8.63814 0.0343395C8.62671 0.0114817 8.59242 5.25708e-05 8.55814 5.25708e-05C6.8438 0.297204 5.20947 0.811503 3.678 1.52009C3.66657 1.52009 3.65515 1.53152 3.64372 1.54295C0.53506 6.19451 -0.322107 10.7203 0.100762 15.2005C0.100762 15.2233 0.112191 15.2462 0.135048 15.2576C2.19225 16.7662 4.16945 17.6805 6.12378 18.2863C6.15807 18.2977 6.19236 18.2863 6.20379 18.2634C6.66094 17.6348 7.07238 16.9719 7.42668 16.2748C7.44954 16.2291 7.42668 16.1834 7.38096 16.1719C6.72952 15.9205 6.11236 15.6233 5.50662 15.2805C5.46091 15.2576 5.46091 15.189 5.4952 15.1548C5.62091 15.0633 5.74663 14.9605 5.87235 14.869C5.89521 14.8462 5.92949 14.8462 5.95235 14.8576C9.88389 16.6519 14.124 16.6519 18.0098 14.8576C18.0327 14.8462 18.067 14.8462 18.0898 14.869C18.2155 14.9719 18.3413 15.0633 18.467 15.1662C18.5127 15.2005 18.5127 15.269 18.4556 15.2919C17.8612 15.6462 17.2327 15.9319 16.5812 16.1834C16.5355 16.1948 16.5241 16.2519 16.5355 16.2862C16.9012 16.9834 17.3127 17.6462 17.7584 18.2748C17.7927 18.2863 17.827 18.2977 17.8612 18.2863C19.827 17.6805 21.8042 16.7662 23.8614 15.2576C23.8843 15.2462 23.8957 15.2233 23.8957 15.2005C24.3986 10.0232 23.0614 5.53163 20.3527 1.54295C20.3413 1.53152 20.3299 1.52009 20.307 1.52009ZM8.02098 12.469C6.8438 12.469 5.86092 11.3832 5.86092 10.046C5.86092 8.70886 6.82095 7.62312 8.02098 7.62312C9.23244 7.62312 10.1925 8.72029 10.181 10.046C10.181 11.3832 9.22101 12.469 8.02098 12.469ZM15.9869 12.469C14.8097 12.469 13.8269 11.3832 13.8269 10.046C13.8269 8.70886 14.7869 7.62312 15.9869 7.62312C17.1984 7.62312 18.1584 8.72029 18.147 10.046C18.147 11.3832 17.1984 12.469 15.9869 12.469Z"
                  fill="#F9F8F4"
                />
              </svg>
              <span>Discord</span>
            </Link>
          </div>
        </div>
        <div
          className={
            "lg:!hidden mt-[4.651vw] lg:!mt-0 grid grid-cols-2 flex-row items-center justify-center gap-y-[2.326vw] gap-x-0 lg:!gap-[2.083vw]"
          }
        >
          <Link
            href={"https://zknoid.io"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={
              "hover:opacity-80 font-museo uppercase lg:!normal-case text-[3.721vw] lg:!text-[0.833vw] font-medium"
            }
          >
            About us
          </Link>
          <Link
            href={"https://github.com/ZkNoid"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={
              "hover:opacity-80 font-museo uppercase lg:!normal-case text-[3.721vw] lg:!text-[0.833vw] font-medium"
            }
          >
            Github
          </Link>
          <Link
            href={"https://zknoid.medium.com"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={
              "hover:opacity-80 font-museo uppercase lg:!normal-case text-[3.721vw] lg:!text-[0.833vw] font-medium"
            }
          >
            Blog
          </Link>
          <Link
            href={"https://docs.zknoid.io"}
            target={"_blank"}
            rel="noopener noreferrer"
            className={
              "hover:opacity-80 font-museo uppercase lg:!normal-case text-[3.721vw] lg:!text-[0.833vw] font-medium"
            }
          >
            Documentation
          </Link>
        </div>
        <div />
      </div>
      <div
        className={
          "lg:!hidden flex flex-col lg:!flex-row items-start lg:!items-center justify-between w-full"
        }
      >
        <div
          className={
            "flex flex-row items-center gap-[3.256vw] lg:!gap-[0.833vw]"
          }
        >
          {SOCIALS.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className={"flex items-center justify-center hover:opacity-80"}
            >
              <Image
                alt={item.name}
                src={item.whiteImage}
                className={
                  "h-[6.047vw] lg:!h-[1.25vw] w-[6.047vw] lg:!w-[1.25vw]"
                }
              />
            </Link>
          ))}
        </div>
        <div
          className={
            "mt-[6.977vw] lg:!mt-0 font-mono text-[3.256vw] lg:!text-[0.625vw] font-light"
          }
        >
          © {new Date().getFullYear()} ZkNoid: all rights reserved
        </div>
      </div>
    </div>
  );
}
