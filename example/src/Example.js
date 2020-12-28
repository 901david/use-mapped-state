import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "@bootstrap-styled/v4";

import { useMappedState } from "react-use-mapped-state";

const startingState = [
  ["isDisabled", true],
  ["currentTodo", ""],
];

const Example = () => {
  const [{ isDisabled }, setState] = useMappedState(startingState);

  const handleTodoChange = (evt) => {
    const { value: userEnteredTodo } = evt.target;
    const shouldBeDisabled = !userEnteredTodo;
    setState(
      ["currentTodo", "isDisabled"],
      [userEnteredTodo, shouldBeDisabled]
    );
  };
  console.log("isDisabled", isDisabled);
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label htmlFor="add-todo" />
              <Input
                onChange={handleTodoChange}
                id="add-todo"
                placeholder="Add todo here"
              />
            </FormGroup>
          </Form>
          <Button disabled={isDisabled} color="primary">
            Add Todo
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Example;
