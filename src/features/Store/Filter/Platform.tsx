import { Checkbox } from "@nextui-org/checkbox";

export default function Platform({ platform, hanleFilter }) {
  return (
    <ul className="flex flex-col gap-3 text-xs">
      {platform.map((p) => {
        return (
          <li className="text-gray-300 flex" key={p.id}>
            <label>
              <div className="flex gap-3 cursor-pointer items-center">
                {p.chek ? (
                  <Checkbox
                    size="sm"
                    defaultSelected={true}
                    className="p-0 pr-2"
                    onChange={(e) => hanleFilter(p.val, e)}
                  ></Checkbox>
                ) : (
                  <Checkbox
                    size="sm"
                    className="p-0 pr-2"
                    onChange={(e) => hanleFilter(p.val, e)}
                  ></Checkbox>
                )}
                {p.title}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
