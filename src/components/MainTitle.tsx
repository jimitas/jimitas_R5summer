import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

export function MainTitle() {
  return (
    <div>
      <div className="flex justify-center">
        <FontAwesomeIcon className="w-10" icon={faCat} />　
        <div>
          <ruby>
            地味
            <rt>じみ</rt>
          </ruby>
          に
          <ruby>
            助<rt>たす</rt>
          </ruby>
          かる
          <ruby>
            学習
            <rt>がくしゅう</rt>
          </ruby>
          コンテンツ　
        </div>
        <FontAwesomeIcon className="w-10" icon={faCat} />
      </div>
      <div className="text-4xl  text-center">
        Jimitas
        <span className="text-2xl">(ジミタス)</span>
      </div>
    </div>
  );
}
