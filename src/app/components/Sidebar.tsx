/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useRef, useState} from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { sidebarStructure } from "./structure";

interface SidebarProps {
  setExpand: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ setExpand }) => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 클라이언트 측에서만 실행
      setActiveLink(window.location.pathname);
    }
  }, []);

  const username = "Miles Heizer";
  const company = "Unilever";
  const profilePic =
    "https://img.mbiz.web.id/180x180/erp/R2p1IXoyVEpBMk01WOEAdaI3hHVlkuIg0wW5_pn-CJCKHSrA_n1-U1tfE7Bl5H4_4Z7AxgL0DPOmUCdPuCHHC5lWvMU5Ig3t1uDrkVN53MlWlnA";
  const link = "/";

  const [openedMenu, setOpenedMenu] = useState<Record<string, any>>({});
  const [activeName, setActiveName] = useState("");


  const listRef = useRef<any>({});

  const [isExpand, setIsExpand] = useState(true);
  const [isExpandOnHover, setIsExpandOnHover] = useState(false);

  const handleHoverExpand = (value: boolean) => {
    if (!isExpand) {
      setIsExpandOnHover(value);
    }
  };

  const handleNavigate = (path: string) => {
    setActiveName(path);
  };

  const handleToggle = (name: string) => {
    const rootEl = name.split(".")[0];

    if (openedMenu[name]?.open === true) {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: false,
          height: "0px"
        },
        [rootEl]: {
          open: rootEl === name ? false : true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) -
            (listRef.current[name]?.scrollHeight || 0)
          }px`
        }
      }));
    } else {
      setOpenedMenu((prevState) => ({
        ...prevState,
        [name]: {
          open: true,
          height: `${listRef.current[name]?.scrollHeight || 0}px`
        },
        [rootEl]: {
          open: true,
          height: `${
            (listRef.current[rootEl]?.scrollHeight || 0) +
            (listRef.current[name]?.scrollHeight || 0)
          }px`
        }
      }));
    }
  };

  const generateIcon = (icon: string) => {
    var icons_map: Record<string, JSX.Element> = {};

    icons_map["dasbor"] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current"
        viewBox="0 0 24 24"
        version="1.1"
      >
        <g
          id="ic_kanban"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M20,3 C21.1045695,3 22,3.8954305 22,5 L22,15 C22,16.1045695 21.1045695,17 20,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L2,5 C2,3.8954305 2.8954305,3 4,3 L20,3 Z M11.5,6 L6.5,6 C5.67157288,6 5,6.67157288 5,7.5 L5,7.5 L5,9.5 C5,10.3284271 5.67157288,11 6.5,11 L6.5,11 L11.5,11 C12.3284271,11 13,10.3284271 13,9.5 L13,9.5 L13,7.5 C13,6.67157288 12.3284271,6 11.5,6 L11.5,6 Z"
            id="Combined-Shape"
            fill="currentColor"
          />
          <path
            d="M8,21 L16,21 M12,17 L12,21"
            id="Combined-Shape"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
    icons_map["transaksi"] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current"
        viewBox="0 0 24 24"
      >
        <path
          d="m20.247634 1c1.0125221 0 1.8333334.82081129 1.8333334 1.83333333s-.8208113 1.83333334-1.8333334 1.83333334c-.3158442 0-.6130339-.07986936-.8724738-.22051281l-3.0249251 3.47961717c.1346337.25513483.2108509.5458717.2108509.85441003 0 1.01252204-.8208113 1.83333334-1.8333334 1.83333334-.9820883 0-1.7838173-.7722101-1.8311257-1.74256896l-2.2033918-.75849737c-.336256.40778098-.84535009.66773299-1.41515923.66773299-.32712483 0-.63423886-.08567643-.90012689-.2358141l-2.87560465 2.41277624c.05416355.1730906.08335496.3572185.08335496.5481644 0 1.012522-.8208113 1.8333333-1.83333334 1.8333333s-1.83333333-.8208113-1.83333333-1.8333333c0-1.0125221.82081129-1.83333335 1.83333333-1.83333335.33090488 0 .64133381.08766791.90932763.24104456l2.86960725-2.40787374c-.05621505-.1760311-.0865583-.3636207-.0865583-.55829735 0-1.01252204.8208113-1.83333333 1.83333334-1.83333333.97577423 0 1.77350093.76231258 1.83011983 1.7238777l2.2160025.76325559c.336304-.39976002.8402621-.65379996 1.4035544-.65379996.2130474 0 .4176071.03634016.6078186.10315996l3.1693503-3.64581344c-.0588143-.17965899-.0906208-.37154554-.0906208-.57086091 0-1.01252204.8208113-1.83333333 1.8333333-1.83333333z"
          opacity=".48"
          fill="currentColor"
        />
        <path
          d="m21.1666667 9.60855714c.506261 0 .9166666.41040566.9166666.91666666v10.7540685c0 .2761423-.2238576.5-.5.5h-2.6666666c-.2761424 0-.5-.2238577-.5-.5v-10.7540685c0-.506261.4104056-.91666666.9166666-.91666666zm-5.5 6.42549146c.506261 0 .9166666.4104057.9166666.9166667v4.328577c0 .2761423-.2238576.5-.5.5h-2.6666666c-.2761424 0-.5-.2238577-.5-.5v-4.328577c0-.506261.4104056-.9166667.9166666-.9166667zm-5.5-1.8405511c.506261 0 .9166666.4104057.9166666.9166667v6.1691281c0 .2761423-.2238576.5-.5.5h-2.66666663c-.27614238 0-.5-.2238577-.5-.5v-6.1691281c0-.506261.41040564-.9166667.91666666-.9166667zm-5.50000003 4.7135227c.50626102 0 .91666666.4104057.91666666.9166667v1.4556054c0 .2761423-.22385762.5-.5.5h-2.66666666c-.27614238 0-.5-.2238577-.5-.5v-1.4556054c0-.506261.41040564-.9166667.91666666-.9166667z"
          fill="currentColor"
        />
      </svg>
    );
    icons_map["perusahaan"] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21.5367 20.5812H2.45436C1.92714 20.5812 1.5 21.0083 1.5 21.536C1.5 22.0628 1.92714 22.4899 2.45436 22.4899H21.5362C22.0635 22.4899 22.4906 22.0628 22.4906 21.536C22.4902 21.0083 22.063 20.5812 21.5367 20.5812Z"
          fill="currentColor"
        />
        <path
          d="M3.64772 18.1001C3.1205 18.1001 2.69336 18.5273 2.69336 19.0545C2.69336 19.5817 3.1205 20.0093 3.64772 20.0093H20.3446C20.8718 20.0093 21.2989 19.5817 21.2989 19.0545C21.2989 18.5273 20.8718 18.1001 20.3446 18.1001H20.1064V9.51266H20.3446C20.6086 9.51266 20.8213 9.29909 20.8213 9.03592C20.8213 8.77276 20.6077 8.55919 20.3446 8.55919H3.64772C3.38411 8.55919 3.17099 8.77276 3.17099 9.03592C3.17099 9.29909 3.38456 9.51266 3.64772 9.51266H3.88631V18.0997H3.64772V18.1001ZM18.1977 9.51266V18.0997H15.3355V9.51266H18.1977ZM13.4268 9.51266V18.0997H10.5646V9.51266H13.4268ZM5.79414 9.51266H8.65633V18.0997H5.79414V9.51266Z"
          fill="currentColor"
        />
        <path
          opacity="0.48"
          d="M2.45438 7.70134H21.5363C21.5394 7.70134 21.543 7.70134 21.5456 7.70134C22.0733 7.70134 22.5 7.2742 22.5 6.74698C22.5 6.32788 22.2301 5.97268 21.8553 5.844L12.3876 1.58377C12.1387 1.47208 11.8541 1.47208 11.6048 1.58377L2.06298 5.87706C1.65238 6.06204 1.42674 6.50794 1.52146 6.94759C1.61574 7.38724 2.00445 7.70134 2.45438 7.70134Z"
          fill="currentColor"
        />
      </svg>
    );
    icons_map["mou"] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          opacity="0.48"
          d="M17.7231 7.11493C18.4822 7.12263 19.5376 7.12593 20.4328 7.12263C20.8913 7.12153 21.1244 6.56823 20.8064 6.23493C19.6563 5.02713 17.5989 2.86563 16.4216 1.62923C16.096 1.28713 15.5264 1.52253 15.5264 1.99663V4.89623C15.5264 6.11283 16.5185 7.11493 17.7231 7.11493Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6049 16.8291H8.68011C8.23358 16.8291 7.86328 16.4551 7.86328 16.0041C7.86328 15.5531 8.23358 15.1901 8.68011 15.1901H14.6049C15.0514 15.1901 15.4217 15.5531 15.4217 16.0041C15.4217 16.4551 15.0514 16.8291 14.6049 16.8291ZM8.68011 9.69006H12.3613C12.8078 9.69006 13.1781 10.0641 13.1781 10.5151C13.1781 10.9661 12.8078 11.3291 12.3613 11.3291H8.68011C8.23358 11.3291 7.86328 10.9661 7.86328 10.5151C7.86328 10.0641 8.23358 9.69006 8.68011 9.69006ZM20.9208 8.722C20.4525 8.722 19.8971 8.733 19.5595 8.733C19.0585 8.733 18.405 8.722 17.5773 8.722C15.5842 8.711 13.9397 7.061 13.9397 5.048V1.506C13.9397 1.231 13.7218 1 13.4387 1H7.62282C4.91094 1 2.71094 3.233 2.71094 5.961V17.819C2.71094 20.679 5.01985 23 7.85153 23H16.5208C19.2218 23 21.4109 20.789 21.4109 18.061V9.217C21.4109 8.942 21.1931 8.722 20.9208 8.722Z"
          fill="currentColor"
        />
      </svg>
    );
    icons_map["pusatunduhdata"] = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1.586l-.293-.293a1 1 0 10-1.414 1.414l2 2 .002.002a.997.997 0 001.41 0l.002-.002 2-2a1 1 0 00-1.414-1.414l-.293.293V9z"
        />
      </svg>
    );
    return icons_map[icon];
  };

  const generateMenu = (item: any, index: number, recursive: number = 0) => {
    if (activeName === "" && activeLink.includes(item.link)) {
      setActiveName(item.name);
    }
    const classesActive = activeName === item.name ? "active" : "";

    return (
      <li key={index}>
        <a
          role="button"
          tabIndex={0}
          id={item.id}
          onClick={() => {
            if ("child" in item) {
              handleToggle(item.name);
            } else if ("link" in item) {
              handleNavigate(item.name);
            }
          }}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Space") {
              if ("child" in item) {
                handleToggle(item.name);
              } else if ("link" in item) {
                handleNavigate(item.name);
              }
            }
          }}
          className={[
            "group m-0 flex cursor-pointer rounded-lg items-center justify-between h-12 py-0 pr-3 mb-1 focus:outline-none",
            recursive === 0 ? "pl-4" : recursive === 1 ? "pl-11" : "pl-16",
            activeName === item.name || activeName.split(".")[0] === item.name
              ? `text-blue-600 font-semibold ${
                item.parent ? "bg-blue-200/20 " : "bg-transparent"
              }`
              : `text-slate-500 ${item.parent && ""}`,
            "hover:bg-slate-300/20",
            classesActive
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            {item.icon ? (
              item.icon === "dot" ? (
                <div className="h-3 w-3 flex items-center justify-center">
                  <div
                    className={[
                      `${classesActive ? "h-2 w-2" : "h-1 w-1"}`,
                      "bg-current rounded-full transition duration-200"
                    ].join(" ")}
                  ></div>
                </div>
              ) : (
                generateIcon(item.icon)
              )
            ) : null}
            <div
              className={`truncate ${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              {item.title}
            </div>
          </div>
          {"child" in item ? (
            <div
              className={`${
                isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            false
          )}
        </a>
        {"child" in item ? (
          <ul
            ref={(el) => {
              if (el) {
                listRef.current[item.name] = el; // ref 값 할당
              }
            }}
            className={[
              "transition-max-height overflow-hidden duration-300 ease-in-out",
              isExpand ? "" : isExpandOnHover ? "" : "h-0"
            ].join(" ")}
            style={{ maxHeight: `${openedMenu[item.name]?.height || "0px"}` }}
            key={item.name}
          >
            {item.child.map((value: any, idx: number) =>
              generateMenu(value, idx, recursive + 1)
            )}
          </ul>
        ) : (
          false
        )}
      </li>
    );
  };

  return (
    <nav
      role="navigation"
      className={[
        "bg-slate-50 border-r border-slate-100 shadow-sm absolute inset-y-0 left-0",
        "transition-all duration-300 ease-in-out md:fixed",
        `${
          isExpand
            ? "bg-slate-50 w-72"
            : isExpandOnHover
              ? "bg-slate-50/70 w-72 backdrop-blur-md"
              : "bg-slate-50 w-20"
        }`
      ].join(" ")}
    >
      <button
        className="absolute z-50 top-16 -right-3 bg-white hover:bg-slate-100 text-slate-500 p-0.5 rounded-full border border-slate-200"
        onClick={() => {
          setIsExpand(!isExpand);
          setExpand(!isExpand);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            isExpand ? "rotate-0" : "rotate-180"
          } transform transition duration-500 h-4 w-4`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        onMouseEnter={() => handleHoverExpand(true)}
        onMouseLeave={() => handleHoverExpand(false)}
        className={`relative h-screen overflow-hidden`}
      >
        <SimpleBar style={{ height: "100%" }} autoHide>
          <div className="mb-0 list-none text-slate-500">
            <div
              className={`my-8 flex flex-col items-center overflow-x-hidden duration-300 ${
                isExpand ? "px-3" : isExpandOnHover ? "px-3" : "px-5"
              }`}
            >
              <a
                href={link}
                className={`flex items-center rounded-lg w-full h-20 duration-300 ${
                  isExpand
                    ? "bg-slate-300/25 px-4 gap-3"
                    : isExpandOnHover
                      ? "bg-slate-300/25 px-4 gap-3"
                      : ""
                }`}
              >
                <div
                  className={`rounded-full overflow-hidden duration-300 h-10 w-10 shrink-0`}
                >
                  <img src={profilePic} className="block" alt="" />
                </div>
                <div
                  className={`flex flex-col ${
                    isExpand ? "" : isExpandOnHover ? "" : "w-0 h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`text-base font-semibold text-slate-700 truncate duration-300`}
                  >
                    {username}
                  </div>
                  <div className={`text-sm text-slate-500 truncate`}>
                    {company}
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-3 mb-10 p-0 leading-10">
              <ul className="list-none text-sm font-normal px-3">
                {sidebarStructure.map((item, index) =>
                  generateMenu(item, index)
                )}
              </ul>
            </div>
          </div>
        </SimpleBar>
      </div>
    </nav>
  );
};

export default Sidebar;
