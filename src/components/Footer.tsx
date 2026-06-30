"use client";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-paper/10 px-6 py-12 text-center">
      <div className="hairline mx-auto mb-8 w-32" />
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="ink-seal flex h-9 w-9 items-center justify-center rounded-md text-base">
          诗
        </span>
        <span className="font-cal text-2xl text-gold-grad">引诗为名</span>
      </div>
      <p className="font-xiaowei text-sm text-paper/60">
        取千年诗韻 · 賜一生嘉名
      </p>
      <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-paper/40">
        本系统所辑名字皆出自《诗经》《楚辞》及唐宋诗词、诸子典籍，
        引文释义力求信而有征。起名为人生大事，本工具仅供参考启发，
        还请结合家谱辈分、五行八字与父母期许细细斟酌。
      </p>
      <p className="mt-6 text-xs text-paper/30">
        谨以此致敬千载以降的诗人与先贤 · 文脉不绝
      </p>
    </footer>
  );
}
