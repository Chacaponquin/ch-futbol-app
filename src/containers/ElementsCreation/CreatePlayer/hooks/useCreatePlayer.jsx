import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client/react";
import UserContext from "../../../../context/UserContext";
import { useState } from "react";
import { getAllCountries } from "../../../../shared/graphql/getAllCountries";
import { createPlayer } from "../graphql/createPlayer";
import { showError } from "../../../../helpers/showNotifications";
import { userRoles } from "../../../../helpers/userRoles";
import axios from "axios";
import { getPlayerPositions } from "../../../../shared/graphql/getPlayerPositions";

export const useCreatePlayer = () => {
  const navigate = useNavigate();

  const { actualUser } = useContext(UserContext);
  const [showImage, setShowImage] = useState(null);
  const [playerImage, setPlayerImage] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [playerPositions, setPlayerPositions] = useState([]);

  const [playerData, setPlayerData] = useState({
    birth: null,
    pos: null,
    firstName: null,
    lastName: null,
    country: null,
    gender: null,
  });

  useQuery(getAllCountries, {
    onCompleted: ({ getCountryList }) => setCountryList(getCountryList),
  });
  useQuery(getPlayerPositions, {
    onCompleted: ({ getPlayerPositions }) =>
      setPlayerPositions(getPlayerPositions),
  });
  const [playerMutation, { loading }] = useMutation(createPlayer);

  const onChangeName = (e) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };
  const onDateChange = (date, dateString) => {
    setPlayerData({ ...playerData, birth: date });
  };
  const onPosChange = (value) => {
    setPlayerData({ ...playerData, pos: value });
  };
  const onGenderChange = (value) => {
    setPlayerData({ ...playerData, gender: value });
  };

  const onImageChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      const reader = new FileReader();

      reader.onload = (file) => {
        setShowImage(reader.result);
        setPlayerImage(files[0]);
      };

      reader.readAsDataURL(files[0]);
    }
  };
  const onCountryChange = (value) => {
    setPlayerData({ ...playerData, country: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.values(playerData);

    for (let i = 0; i < values.length; i++) {
      if (!values[i] || !playerImage) {
        showError({ message: "Ningun campo puede estar vacio" });
        return;
      }
    }

    const data = new FormData();
    data.set("image", playerImage);

    setImageLoader(true);
    axios
      .post(`${process.env.REACT_APP_API_CURRENT}/uploadImage`, data)
      .then((res) => {
        const { imageUrl } = res.data;

        playerMutation({
          variables: { player: { ...playerData, imageUrl: imageUrl } },
          onCompleted: () => navigate("/dashboard"),
          onError: showError,
        });
      })
      .catch((error) => showError(error))
      .finally(() => setImageLoader(false));
  };

  useEffect(() => {
    if (actualUser.role !== userRoles.PLAYER) navigate("/dashboard");
  }, [actualUser, navigate]);

  return {
    handleSubmit,
    showImage,

    countryList,

    loading,
    imageLoader,
    playerPositions,

    onPosChange,
    onImageChange,
    onChangeName,
    onDateChange,
    onGenderChange,
    onCountryChange,
  };
};
