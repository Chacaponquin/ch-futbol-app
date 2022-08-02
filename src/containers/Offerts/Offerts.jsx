import React from "react";
import { Select } from "antd";
import Icon from "supercons";
import { useQuery } from "@apollo/client";
import { getOffertsById } from "./graphql/getOffertsById";
import LoaderContainer from "../../shared/components/LoaderContainer/LoaderContainer";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { showError } from "../../helpers/showNotifications";

const { Option } = Select;

const Offerts = () => {
  const { elementActive } = useContext(UserContext);

  const filterOptions = {
    MOST_RECENT: "Most Recent",
    MOST_EXPENSIVE: "Most Expensive",
  };

  const { loading } = useQuery(getOffertsById, {
    variables: { elementID: elementActive },
    onCompleted: ({ getOffertsById }) => {
      console.log(getOffertsById);
    },
    onError: showError,
  });

  return (
    <LoaderContainer loading={loading} className={"w-[120px] esm:w-[80px]"}>
      <div className="px-72 w-full flex flex-col">
        <div className="w-full flex justify-end">
          <Select className="w-[400px]">
            {Object.values(filterOptions).map((el) => (
              <Option value={el}>{el}</Option>
            ))}
          </Select>
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          {[1, 2, 3].map((el) => (
            <OffertCard />
          ))}
        </div>
      </div>
    </LoaderContainer>
  );
};

const OffertCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-4 px-8 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h1 className="mb-0 font-monserratBold text-3xl">Hector FC</h1>
        <p className="mb-0 text-slate-500">22 julio</p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Icon glyph="payment" />
          </div>

          <div className="flex items-center">
            <Icon glyph="payment-transfer" />
            <p className="mb-0 text-sm">79429742285729</p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
          quibusdam consectetur incidunt nemo. Laboriosam itaque eveniet
          veritatis asperiores cumque?
        </p>
      </div>

      <div className="flex justify-start gap-3">
        <button className="bg-primary_color py-2 px-4 text-white font-bold text-base rounded-md">
          Accept
        </button>
        <button className="py-2 px-4 bg-slate-200 text-black font-bold text-base rounded-md">
          Decline
        </button>
      </div>
    </div>
  );
};

export default Offerts;
