import React from "react";
import Link from "next/link";
import styles from "src/components/Links/Links.module.scss";

const ITEMS = [
  {
    title: "１年生",
    links: [
      { href: "101block", title: "ぶろっく" },
      { href: "102kazoeyou", title: "かぞえよう" },
      { href: "103nanbanme", title: "なんばんめ" },
      { href: "104ikutu", title: "いくつといくつ" },
      { href: "105tashizan", title: "たしざんのしかた" },
      { href: "106hikizan", title: "たしざんのしかた" },
      { href: "107tasuren", title: "たしざんのれんしゅう" },
      { href: "108hikiren", title: "ひきざんのれんしゅう" },
    ],
  },
  {
    title: "２年生",
    links: [
      { href: "07tokei", title: "とけい" },
      { href: "12ookinakazu", title: "大きな数" },
      // { href: "./", title: "d" },
      // { href: "./", title: "d" },
      // { href: "./", title: "d" },
      // { href: "./", title: "d" },
      // { href: "./", title: "d" },
    ],
  },
  {
    title: "そのほか",
    links: [
      { href: "08keisanbou", title: "けいさんぼう" },
      { href: "09okane", title: "おかね" },
      { href: "10kenban", title: "けんばん" },
      { href: "11hiragana1", title: "ひらがな１" },
    ],
  },
];

const Links: React.FC = () => {
  return (
    <div>
      {ITEMS.map((itemGroup) => (
        <div key={itemGroup.title}>
          <hr />
          <div className={styles.sub}>{itemGroup.title}</div>
          <div className={styles.grid}>
            {itemGroup.links.map((item) => (
              <Link key={item.href} href={item.href}>
                <button type="button" className={styles.btn}>
                  {item.title}
                </button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Links;
