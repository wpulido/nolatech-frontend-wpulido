import { render, screen } from "@testing-library/react";
import PostFormModal from "./PostFormModal";
import { MantineProvider } from "@mantine/core";

describe("PostFormModal", () => {
  it("renderiza el formulario correctamente", () => {
    render(
      <MantineProvider theme={{}}>
        <PostFormModal opened={true} onClose={() => {}} onSubmit={() => {}} />
      </MantineProvider>
    );

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contenido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor/i)).toBeInTheDocument();
  });
});
