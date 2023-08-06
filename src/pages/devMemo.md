8/5 できるだけ、tsx での記述を目指すが、一部 jsx または、js でもよいと考える。 <FontAwesomeIcon icon={faQuestion}/>の？
アイコンの大きさが制御できないため、テキストの？で代用している。 jimitas-old の global-css を当てると元に戻った。global
は重複しているように思うが、とりあえずこれでよいことにする。

button hover や active が効いていない。全体的に CSS がきちんと当たっていない。具体的にはホバーやアクティブが効かない。

午後からの Todo 1.まずすべての jsx ファイルを tsx ファイルに変換できるよう努める。 2.block.Tsx のブロックをマップ関数で
展開できるようにする。 3.お金や数え棒についても同様にする。

ボタンについては FontAwesomeIcon の、width を直接指定して制御した。

05 足し算までいったが、useState で式の値を保持するようにしないといけない。

夜とりあえず、pages 配下の jsx を tsx に形として変更できた。ただ、vercel デプロイがうまくいってなさそう。コンポーネント
配下の jsx→tsx に変換する

8/6

map 関数を使って、数図ブロックを展開できるように試みる。具体的には、参考演算子で、length > index のときだけ

8/6 午後何番目の問題２で正解の動物をクリックしても正解するバグの修正が必要

足し算１で TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'. typescript 特有のエ
ラーだと思われるが出ている。本番環境では問題ないのか？ビルドが許されるのか？

足し算も引き算も問題を押すと、ドラッグアンドドロップが効かなくなる。おそらく、ブロックのところで useEffect で管理できて
いないからかなあ？

Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'
おそらく、仮想DOMで扱おうとしたときに、配列でブロックの要素を管理し、popなどのメソットで
扱うようにしたほうがいいと考える。そしてuseEffectで、状態を管理する？