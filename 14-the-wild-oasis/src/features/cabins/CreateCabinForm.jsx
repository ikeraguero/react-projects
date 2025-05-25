import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { cabinCreate, isEditing } = useCreateCabin(cabin, reset);

  function onSubmit(data) {
    cabinCreate({ ...data, image: data.image[0] }, {
      onSuccess: () => {
        onCloseModal?.();
      }
    }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          defaultValue={isEditing ? cabin.name : ""}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          defaultValue={isEditing ? cabin.max_capacity : 0}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          defaultValue={isEditing ? cabin.regular_price : 0}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={isEditing ? cabin.discount : 0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= getValues().regular_price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue={isEditing ? cabin.description : ""}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          defaultValue=""
          {...register("image", {
            required: !isEditing ? "This field is required" : false,
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>{isEditing ? "Save" : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
