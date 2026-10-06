const char *msg = "hello";
int initialized = 0x1234;
int uninitialized;

int add(int a, int b) {
    return a + b;
}

int main(void) {
    return add(initialized, uninitialized);
}
