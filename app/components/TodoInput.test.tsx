import { screen } from "@testing-library/react";
import TodoInput from "./TodoInput";
import { renderWithQueryClient } from "@/test/utils";
import userEvent from "@testing-library/user-event";
import { TodoServices } from "../../services/query/todos";

jest.mock("../../services/query/todos", () => ({
  TodoServices: {
    createTodo: jest.fn(),
  },
}));

describe("TodoInput", () => {
  test("renders input and add button", () => {
    renderWithQueryClient(<TodoInput />);

    // input field
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    // add button
    const button = screen.getByRole("button", {
      name: /add/i,
    });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("allows user to type in input", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(<TodoInput />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);

    await user.type(input, "Learn testing");

    expect(input).toHaveValue("Learn testing");
  });

  test("submits the form and clears the input", async () => {
    const user = userEvent.setup();

    // mock API success response
    (TodoServices.createTodo as jest.Mock).mockResolvedValue({
      data: {
        title: "Learn Testing",
        completed: false,
        userId: 1,
      },
    });

    const { queryClient } = renderWithQueryClient(<TodoInput />);

    // seed initial todos cache
    queryClient.setQueryData(["todos"], { data: [] });

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole("button", {
      name: /add/i,
    });

    // user actions
    await user.type(input, "Learn Testing");
    await user.click(addButton);

    // verify mutation call
    expect(TodoServices.createTodo).toHaveBeenCalledTimes(1);

    const payload = (TodoServices.createTodo as jest.Mock).mock.calls[0][0];

    expect(payload).toEqual(
      expect.objectContaining({
        title: "Learn Testing",
        completed: false,
        userId: 1,
        id: expect.any(Number),
      })
    );

    // verify input reset
    expect(input).toHaveValue("");
  });
});
