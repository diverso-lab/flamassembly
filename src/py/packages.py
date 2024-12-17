import micropip


async def install_flamapy_packages():
    await micropip.install("flamapy==2.0.0", deps=False)
    await micropip.install("flamapy-fw==2.0.0")
    await micropip.install("flamapy-fm==2.0.0")
    await micropip.install("flamapy-sat==2.0.0")
    print("Flamapy packages installed.")
