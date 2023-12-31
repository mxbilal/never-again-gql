import React from "react";

const Ayat = () => {
  return (
    <div className="p-3 rounded bg-light text-center bg-neverSearch">
      <blockquote id="blockquote">
        <p className="mb-0">
          يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تَتَّخِذُوا۟ ٱلْيَهُودَ
          وَٱلنَّصَـٰرَىٰٓ أَوْلِيَآءَ ۘ بَعْضُهُمْ أَوْلِيَآءُ بَعْضٍۢ ۚ
          وَمَن يَتَوَلَّهُم مِّنكُمْ فَإِنَّهُۥ مِنْهُمْ ۗ إِنَّ ٱللَّهَ لَا
          يَهْدِى ٱلْقَوْمَ ٱلظَّـٰلِمِينَ
        </p>
        <br />
        <footer id="blockquote-footer">
          O you who have believed, do not take the Jews and the Christians as
          allies. They are [in fact] allies of one another. And whoever is an
          ally to them among you – then indeed, he is [one] of them. Indeed,
          Allah guides not the wrongdoing people.{" "}
          <cite title="Source Title">(Quran 5:51)</cite>
        </footer>
      </blockquote>
    </div>
  );
};

export default Ayat;
