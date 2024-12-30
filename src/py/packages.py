import micropip

async def install_flamapy_packages():
    try:
        # Install Pyodide packages first
        print("Installing Pyodide packages...")

        pyodide_wheels = [
            "../pyodide/micropip-0.6.0-py3-none-any.whl",
            "../pyodide/packaging-23.2-py3-none-any.whl",
            "../pyodide/six-1.16.0-py2.py3-none-any.whl",
            "../pyodide/python_sat-1.8.dev13-cp312-cp312-pyodide_2024_0_wasm32.whl"
        ]

        for wheel in pyodide_wheels:
            try:
                print(f"Installing Pyodide package: {wheel}...")
                await micropip.install(wheel, keep_going=True)
            except Exception as e:
                print(f"Failed to install Pyodide package {wheel}: {e}")

        print("Pyodide packages installed successfully.")

        # Install Flamapy packages
        print("Installing Flamapy packages...")

        flamapy_wheels = [
            "../flamapy/ply-3.10-py2.py3-none-any.whl",
            "../flamapy/astutils-0.0.6-py3-none-any.whl",
            "../flamapy/dd-0.5.7-py3-none-any.whl",
            "../flamapy/flamapy_sat-2.0.1-py3-none-any.whl",
            "../flamapy/flamapy-2.0.1-py3-none-any.whl",
            "../flamapy/flamapy_bdd-2.0.1-py3-none-any.whl",
            "../flamapy/flamapy_fm-2.0.1-py3-none-any.whl",
            "../flamapy/flamapy_fw-2.0.1-py3-none-any.whl",
            "../flamapy/afmparser-1.0.3-py3-none-any.whl",
            "../flamapy/antlr4_python3_runtime-4.13.1-py3-none-any.whl",
            "../flamapy/graphviz-0.20-py3-none-any.whl",
            "../flamapy/uvlparser-2.0.1-py3-none-any.whl"
        ]

        for wheel in flamapy_wheels:
            try:
                print(f"Installing Flamapy package: {wheel}...")
                await micropip.install(wheel, deps=False)
            except Exception as e:
                print(f"Failed to install Flamapy package {wheel}: {e}")

        print("Flamapy packages installed successfully.")

    except Exception as e:
        print(f"An error occurred during the installation process: {e}")
