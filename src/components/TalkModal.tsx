"use client";
import classNames from 'classnames';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import closeButton from '@/../public/components/closeModal.svg';
import questionButton from '@/../public/components/question.svg';

type IModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode,
  bgColor?: string;
  border?: boolean;
  size?: string;
};

export function TalkModal({ onClose, isOpen, children, bgColor, border, size }: IModalProps) {
  const constraintsRef = useRef(null);

  return (
    <motion.div
      className={classNames(" flex justify-center items-center",
        { 'hidden': !isOpen }
      )}
      ref={constraintsRef}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="flex w-full justify-center bg-transparent items-center"
      >
        <article className={classNames("flex flex-col w-full p-4 rounded-lg", border !== false ? "border-2 border-silver" : "", bgColor ? bgColor : 'bg-main', size ? 'lg:max-w-[45%]' : 'min-w-full lg:max-w-[75%]')}>
          {children}
          <footer></footer>
        </article>
      </motion.div>
    </motion.div>
  );
}
