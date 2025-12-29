## Computer Memory



## Graphics Card

### GPU vs CPU

- GPU contains 10496 cores, whereas CPU has 24 cores
- GPU is like giant cargo ship always hungry for data, CPU is like fast jet plane
- CPU can run different types of softwares
- GPU is less flexible, can't run OS or interface with input devices or networks
- for large data GPU is faster, but for small data CPU is faster

### GPU cores

Inside GPU => 7 **GPC** (graphics processing clusters) => each cluster => 12 streaming multiprocessors (**SM**) => inside each SM => 4 Warp, 1 **Ray Tracing Cores** => inside each RT core => 32 **CUDA Cores**, 1 **Tensor Core**

In a GPU => 10752 CUDA Cores, 336 Tensor Cores, 84 Ray Tracing Cores

#### CUDA Core

- a simple binary calculator with ADD, MUL and few more
- kinda like a Thread

#### Tensor Core

matrix multiplication and addition calculator, are used for geometric transformations and working with neural networks and AI. A*B + C = RES

#### Ray Tracing Core

largest but fewest, are used to execute Ray Tracing Algorithms

### GPU calculation speed

2 calculations per core * 10496 cores * 1.7 Ghz (clock speed) = 35.6 Trillion calculations per second

### Other Parts of GA102 GPU

2 L2 Cache (6 MB), **Gigathread Engine** (handles scheduling), PCIe interface

### Other Components of GC

Ports, Power Supply (voltage) [12 volt to 1.1 volt], PCIe, Graphics Memory Chips (GDDR6X SDRAM), Cooling pipe/fan

### Model Space, Objects in Gaming World

coordinate of object in world space + coordinate of vertex in model space = coordinate of vertex in world space

### Thread Architecture

- SIMD: single instruction multiple data
   - all thread block/warp same speed
- SIMT: single instruction multiple threads
   - different warp different speed, multiple program counters

## Mining Bitcoins, SHA-256

GPU was used initially. To create a new block on a block chain the **SHA-256** hashing algorithm is run a set of data that includes Transactions, Time, Witness Tx's, Block number, **Nonce** (a random number).

The output of SHA-256 is a random 256 bits, changing Nonce changes the output, kinda like a lottery generator. Success Lottery: first 80 digits all zero, rewards is 3 bitcoins.

Why GPU? A GPU can run multiple SHA with all different Nonce, can generate 95 Million hashes.

### ASIC

Nowadays, computers filled with ASIC's or **Application-Specific Integrated Circuits**, performs 250 Trillion hashes every second, equivalent to 2600 GC. So, GC (spoon) <=> ASIC (excavator)