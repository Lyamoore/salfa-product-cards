export const HP_API = "https://hp-api.onrender.com/api/characters"

export const GENDER_OPTIONS = [
  { value: "Male", label: "Мужской" },
  { value: "Female", label: "Женский" },
]

export const FORM_FIELDS = [
  {
    name: "name",
    label: "Имя",
    placeholder: "Например, Harry Potter",
    required: true,
  },
  {
    name: "species",
    label: "Вид",
    placeholder: "Например, Human",
    required: true,
  },
    {
    name: "gender",
    label: "Пол",
    type: "select",
    required: true,
  },
    {
    name: "birth",
    label: "Дата рождения",
    placeholder: "Например, 31-07-1980",
  },
    {
    name: "ancestry",
    label: "Происхождение",
    placeholder: "Например, Half-blood",
  },
  { 
    name: "house",
    label: "Дом",
    placeholder: "Например, Gryffindor",
  },
  {
    name: "patronus",
    label: "Патронус",
    placeholder: "Например, Stag",
  },
    {
    name: "actor",
    label: "Актёр",
    placeholder: "Например, Daniel Radcliffe",
  },

  {
    name: "image",
    label: "URL изображения",
    placeholder: "https://example.com/image.jpg",
  },
]