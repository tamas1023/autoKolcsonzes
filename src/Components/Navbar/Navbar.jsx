import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Fragment } from "react";
import { AuthCont } from "../Services/AuthContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = (props) => {
  const navitage = useNavigate();
  const authC = useContext(AuthCont);
  const [navigation, setNavigation] = useState([
    { name: "Főoldal", href: "/autoKolcsonzes/Főoldal", current: false, id: 0 },
  ]);
  useEffect(() => {
    // Az admin jogok lekérdezése és beállítása (például AuthContext-ből)
    menuCheck();
  }, [authC]);

  function menuCheck() {
    // Dinamikus navigation létrehozása az admin jogok alapján
    const dynamicNavigation = [
      {
        name: "Főoldal",
        href: "/autoKolcsonzes/Főoldal",
        current: false,
        id: 0,
      },
    ];
    if (authC.isLoggedIn) {
      dynamicNavigation.push({
        name: "Bérlés",
        href: "/autoKolcsonzes/Bérlés",
        current: false,
        id: 1,
      });
    }
    if (authC.isAdmin()) {
      dynamicNavigation.push({
        name: "Autó Hozzáadás",
        href: "/autoKolcsonzes/Hozzáadás",
        current: false,
        id: 2,
      });
    }

    setNavigation(dynamicNavigation);
  }
  //console.log(navigation[3]);
  /*
  const navigation = [
    { name: "Főldal", href: "/Főoldal", current: false, id: 0 },
    { name: "Bérlés", href: "/Bérlés", current: false, id: 1 },
    { name: "Autó Hozzáadás", href: "/Hozzáadás", current: false, id: 2 },
  ];
  */

  const currentChanges = (id) => {
    const updatedNavigation = navigation.map((item) => {
      if (item.id === id) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavigation(updatedNavigation);
  };
  const Logout = () => {
    authC.logout();

    navitage("/autoKolcsonzes/Főoldal");
  };
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-white hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            currentChanges(item.id);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {
                    /* Profile dropdown */
                    authC.isLoggedIn ? (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="./img/default-profile-picture.png"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={Logout}
                                >
                                  Kijelentkezés
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link
                        to={"/autoKolcsonzes/Bejelentkezés"}
                        /*
                        className={classNames(
                          navigation[3].current
                            ? "bg-gray-900 text-white"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        */

                        className={classNames(
                          "text-white hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          currentChanges(3);
                        }}
                      >
                        Bejelentkezés
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
