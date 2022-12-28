import { Navbar, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, useTheme } from '@nextui-org/react';
import { HiMoon } from "react-icons/hi2";
import { Theme } from '@nextui-org/react';
import { BsSunFill } from "react-icons/bs";
import { useTheme as useNextTheme } from 'next-themes'
import { FcTodoList } from "react-icons/fc";

export default function Nav({ children }: { children?: React.ReactNode }) {
  const { type, isDark } = useTheme();
  const { setTheme } = useNextTheme();

  return <Navbar shouldHideOnScroll variant="floating" isBordered>
    <Navbar.Brand>
      <FcTodoList size={50} />
      <Link href="/">
        <Text h2 size="$5xl">TodoList</Text>
      </Link>
    </Navbar.Brand>
    <Navbar.Content hideIn="sm" enableCursorHighlight activeColor="secondary" variant="highlight-rounded">
      <Navbar.Link isActive href="/">Home</Navbar.Link>
      <Navbar.Link href="#Lists">Lists</Navbar.Link>
    </Navbar.Content>
    <Navbar.Content>
      <Button auto color="gradient" onClick={() => {
        if (isDark === true) {
          setTheme("light")
        }
        else
          setTheme("dark")
      }}>
        {isDark ? <BsSunFill /> : <HiMoon />}
      </Button>
    </Navbar.Content>
  </Navbar>
}